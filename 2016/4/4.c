#include <stdio.h>

struct Entry {
  char ch;
  int count;
};
void main() {

  FILE *fp = fopen("4.txt", "r");
  if (fp == NULL) {
    printf("could not open file");
    return;
  }

  struct Entry entries[50] = { 0 };
  char checksum[10];
  int totalEntries = 0;

  int charCode;
  while((charCode = getc(fp)) != EOF) {
    char c = (char)charCode;
    if (c == '-') {
      continue;
    }
    if (c == '[') {
      printf("start sorting!!");
    }
    int entryExists = 0;
    for (int i = 0; i < totalEntries;i++) {
      if (entries[i].ch == c) {
        entries[i].count += 1;
        entryExists = 1;
        break;
      }
    }
    if (entryExists == 0) {
      entries[totalEntries].ch = c;
      entries[totalEntries].count = 1;
      totalEntries += 1;
    }


    printf("%c", c);
  }
}