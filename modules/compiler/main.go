package main

import (
	"bufio"
	"fmt"
	"os"
	/* "time" */
)

func main() {
	file, err := os.OpenFile("./resources/test.jvn", os.O_RDONLY, os.ModeAppend)

	if err != nil {
		fmt.Println("Fatal Error to Read File")
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	if !scanner.Scan() {
		fmt.Println("Error reading file")
		return
	}

	fmt.Print(scanner.Text())
	
	if !scanner.Scan() {
		fmt.Println("Error reading file")
		return
	}

	fmt.Print(scanner.Text())
}