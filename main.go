//go:generate go run -tags generate gen.go

package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/signal"
	"path"
	"runtime"
	"strings"

	"github.com/Mufanc/lorca"
)


func ReleaseExtension(dir string) string {
	var prefix = "/ext_"
	root := path.Join(dir, "MyExtensions")
	os.MkdirAll(root, os.ModePerm)
	for name, data := range assets {
		if strings.HasPrefix(name, prefix) {
			ioutil.WriteFile(path.Join(root, strings.TrimPrefix(name, prefix)), data, os.ModePerm)
		}
	}
	return root
}

func main() {
	dir := path.Join(os.TempDir(), "CX16xSpeed_Mufanc")
	args := []string{
		"@--disable-extensions",
		"@--disable-background-networking",
		"@--disable-renderer-backgrounding",
		"@--password-store",
		"--disable-web-security",
		fmt.Sprintf("--load-extension=%s", ReleaseExtension(dir)),
	}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	ui, err := lorca.New("http://i.chaoxing.com/base", dir, 1000, 700, args...)
	if err != nil {
		log.Fatal(err)
	}
	defer ui.Close()

	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
		case <-sigc:
		case <-ui.Done():
	}

	log.Println("Exiting...")
}
