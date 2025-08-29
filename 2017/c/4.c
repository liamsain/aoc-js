#include <stdio.h>

#define MaxLineLength 200
#define MaxWordsInLine 100
#define MaxCharsInWord 100

int main() {
  FILE *fp = fopen("../2017-4-input.txt", "r");
  if (!fp) {
    printf("Couldn't open file");
    return 1;
  }
  char line[MaxLineLength];
  char *words[MaxWordsInLine][MaxCharsInWord];
  int part1 = 0;


  while(fgets(line, sizeof(line), fp)) {
    printf("%s", line);
    int chIndex = 0;
    char currentWord[MaxCharsInWord];
    int currentWordCharIndex = 0;
    int wordIndex = 0;

    while (1) {
      char ch = line[chIndex];
      if (ch == ' ') {
        currentWord[currentWordCharIndex] = '\0';
        words[wordIndex] = currentWord;
      } else if (ch == '\n') {

      }
      chIndex += 1;
    }

  }


  return 0;
}