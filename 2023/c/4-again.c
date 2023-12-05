int cards[256];
#include <stdio.h>
#include <stdlib.h>

int main()
{
  FILE *f = fopen("../2023-4-input.txt", "r");
  int *id, n;
  while (fscanf(f, "Card %d:", &id))
  {
    printf(id);
    // ++cards[id];
    // int nums[128] = {0};
    // while (fscanf(f, "%d", &n))
    // {
    //   nums[n] = 1;
    // }
    // int ch, wins = 0;
    // fscanf(f, "%c", &ch);
    // while (fscanf(f, "%d", &n))
    // {
    //   if (nums[n])
    //   {
    //     cards[id + ++wins] += cards[id];
    //   }
    // }
  }
  fclose(f);
  // int total = 0;
  // for (int i = 0; i < 255; i++)
  // {
  //   total += cards[i];
  // }
  // printf("total: %d\n", total);
}