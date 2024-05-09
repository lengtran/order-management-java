package org.Projects.RockPaper;

import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        while (true) {
            String[] rps = {"r", "p", "s"};
            String EvilAi = rps[new Random().nextInt(rps.length)];

            String playerMove;

            while(true) {
                System.out.println("Enter your move if you dare (r, p, or s)");
                playerMove = scanner.nextLine();
                if (playerMove.equals("r") || playerMove.equals("p") || playerMove.equals("s")) {
                    break;
                }
                System.out.println(playerMove + " You're an invalid");
            }

            System.out.println("Evil AI played: " + EvilAi);

            if (playerMove.equals(EvilAi)) {
                System.out.println("Draw - You still lose!");
            }
            else if (playerMove.equals("r")) {
                if (EvilAi.equals("p")) {
                    System.out.println("You lose!");

                } else if (EvilAi.equals("s")) {
                    System.out.println("You got lucky");
                }
            }

            else if (playerMove.equals("p")) {
                if (EvilAi.equals("r")) {
                    System.out.println("You got lucky");

                } else if (EvilAi.equals("s")) {
                    System.out.println("You lose!");
                }
            }

            else if (playerMove.equals("s")) {
                if (EvilAi.equals("p")) {
                    System.out.println("You got lucky");

                } else if (EvilAi.equals("r")) {
                    System.out.println("You lose!");
                }
            }

            System.out.println("Try again? (y/n)");
            String playAgain = scanner.nextLine();

            if (!playAgain.equals("y")) {
                break;
            }
        }
        scanner.close();
    }
}
;