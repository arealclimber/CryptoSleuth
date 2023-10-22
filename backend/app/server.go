package app

import (
	"context"
	"net"
	"net/http"
	_ "net/http/pprof"
	"sleuth/app/shutdown"
	"sleuth/infras"
	web "sleuth/router"
	"time"
)

const (
	maxHeaderBytes = 1 << 20
	ctxTimeout     = 5 // 讓程式最多等待 n 秒時間，如果超過 n 秒就強制關閉所有連線
)

// Server struct
type Server struct {
	infra  *infras.Options
	Server web.IRouter
}

// New Server constructor
// @param opts infrastructure options
// @param router interface
// @result server instance
func NewServer(opts *infras.Options, iWeb web.IRouter) *Server {
	opts.OnConfigChange()
	return &Server{infra: opts, Server: iWeb}
}

// region public methods
func (svc *Server) Run() error {
	port := svc.infra.Config.Server.Port
	useTls := svc.infra.Config.Server.UseTls
	server := &http.Server{
		Addr:           ":" + port,
		Handler:        svc.Server.InitRouter(),
		ReadTimeout:    time.Second * svc.infra.Config.Server.ReadTimeout,
		WriteTimeout:   time.Second * svc.infra.Config.Server.WriteTimeout,
		MaxHeaderBytes: maxHeaderBytes,
	}
	if useTls {
		if err := server.ListenAndServeTLS(svc.infra.Config.Server.CertFile, svc.infra.Config.Server.KeyFile); err != nil {
			svc.infra.Logger.Errorf("Error starting HTTPS Server: %s", err)
		}
	} else {
		go func() {
			svc.infra.Logger.Infof("Starting server v%s which ip is %s:%s", svc.infra.Config.Server.AppVersion, svc.getOutboundIP(), port)
			if err := server.ListenAndServe(); err != nil {
				svc.infra.Logger.Errorf("Error starting Server: %s", err)
			}
		}()
	}
	shutdown.Gracefully()
	ctx, shutdown := context.WithTimeout(context.Background(), ctxTimeout*time.Second) // 讓程式最多等待 5 秒時間，如果超過 5 秒就強制關閉所有連線
	defer shutdown()
	if err := server.Shutdown(ctx); err != nil { // 1. 關閉連接埠及2. 等待所有連線處理結束
		return err // handle err
	}
	svc.infra.Logger.Info("Server Exited Properly")
	return server.Shutdown(ctx)
}

// endregion

// region private methods
// Get preferred outbound ip of this machine
func (srv *Server) getOutboundIP() net.IP {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		srv.infra.Logger.Fatal(err)
	}
	defer conn.Close()
	localAddr := conn.LocalAddr().(*net.UDPAddr)
	return localAddr.IP
}

// endregion
