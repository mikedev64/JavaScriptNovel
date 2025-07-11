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

	var linea string = ""

	for scanner.Scan() {
		linea = linea + scanner.Text()
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error al leer el archivo:", err)
	}

	fmt.Print(linea)
}
