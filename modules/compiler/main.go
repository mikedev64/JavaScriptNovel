package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"time"
	"compiler/tokenizer"
)

func main() {
	if len(os.Args) == 1 {
		fmt.Print("No input files provided.")
	}

	files, err := os.ReadDir("./resources/")

	if err != nil {
		fmt.Println("Fatal Error to Read File")
		return
	}

	for _, file := range files {
		filePosition := 1

		if file.IsDir() && !strings.HasSuffix(file.Name(), ".jvn") {
			continue
		}

		fmt.Println("./resources/" + file.Name())

		fileContent, fileContentError := os.OpenFile("./resources/"+file.Name(), os.O_RDONLY, os.ModePerm)

		if fileContentError != nil {
			fmt.Println("Error reading file:", fileContentError)
			continue
		}

		defer fileContent.Close()

		scanner := bufio.NewScanner(fileContent)
		scannerErr := scanner.Err()

		for scanner.Scan() {
			line := scanner.Text()
			tokenizer.CompilerTokenizer(filePosition, 0, line, file.Name())
			filePosition++
		}

		if scannerErr != nil {
			fmt.Println("Error reading file:", fileContentError)
		}
	}

	time.Sleep(5 * time.Second)
}
