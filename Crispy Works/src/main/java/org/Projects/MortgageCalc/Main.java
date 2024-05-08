package org.Projects.MortgageCalc;

import java.text.NumberFormat;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        final byte MonthsPerYear = 12;
        final byte Percent = 100;

        Scanner scanner = new Scanner(System.in);

        System.out.print("Principal:");
        int principal = scanner.nextInt();

        System.out.print("Annual Interest Rate:");

        float annualInterest = scanner.nextFloat();
        float monthlyInterest = annualInterest / Percent / MonthsPerYear;

        System.out.print("Period (Years): ");
        byte years = scanner.nextByte();
        int numberOfPayments = years * MonthsPerYear;

        double mortgage = principal
                * (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments))
                / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

        String mortgageFormatted = NumberFormat.getCurrencyInstance().format(mortgage);
        System.out.println("Mortgage: " + mortgageFormatted);

    }

}