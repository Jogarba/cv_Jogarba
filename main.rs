use std::io;

fn main() {
    println!("Ingresa dos numeros:");

    let mut entrada = String::new();
    io::stdin().read_line(&mut entrada).expect("No se pudo leer el primer numero");
    let num1: i16 = entrada.trim().parse().expect("El primer valor no es un numero");

    entrada.clear();
    io::stdin().read_line(&mut entrada).expect("No se pudo leer el segundo numero");
    let num2: i16 = entrada.trim().parse().expect("El segundo valor no es un numero");

    println!("La suma es: {}", num1 + num2);
}
