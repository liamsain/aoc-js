#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <windows.h>

struct Location
{
  int x;
  int y;
};

void main()
{
  LARGE_INTEGER frequency;
  LARGE_INTEGER start;
  LARGE_INTEGER end;
  double elapsed;

  QueryPerformanceFrequency(&frequency);
  QueryPerformanceCounter(&start);

  enum Facing
  {
    U,
    R,
    D,
    L
  };
  enum Facing facing = U;
  FILE *fp;
  fp = fopen("1.txt", "r");
  if (fp == NULL)
  {
    printf("can't open file");
    return;
  }
  int c;
  char entry[5];
  int entryIndex = 0;

  struct Location locations[1000];
  int currentLocation = 0;

  int changedDirection = 0;
  int x = 0;
  int y = 0;
  int foundRevisitedLocation = 0;

  while ((c = getc(fp)))
  {
    char cc = (char)c;
    if (cc == ' ')
    {
      continue;
    }
    if (changedDirection == 0)
    {
      changedDirection = 1;
      if (facing == U)
      {
        facing = cc == 'R' ? R : L;
      }
      else if (facing == R)
      {
        facing = cc == 'R' ? D : U;
      }
      else if (facing == D)
      {
        facing = cc == 'R' ? L : R;
      }
      else
      {
        facing = cc == 'R' ? U : D;
      }
    }
    else
    {
      if (cc == ',' || cc == EOF)
      {
        changedDirection = 0;
        entry[entryIndex] = '\0';
        entryIndex = 0;
        int amount = atoi(entry);
        if (facing == U)
        {
          
          int finalAmount = y + amount;
          for (int i = y; i < finalAmount;i++) {
            struct Location l;
            l.x = x;
            l.y = i;
            locations[currentLocation]  = l;
            currentLocation += 1;
          }
          y += amount;
        }
        else if (facing == R)
        {
          int finalAmount = x + amount;
          for (int i = x; i < finalAmount;i++) {
            struct Location l;
            l.x = i;
            l.y = y;
            locations[currentLocation] = l;
            currentLocation += 1;
          }
          x += amount;
        }
        else if (facing == D)
        {
          int destY = y - amount;
          for (int i = y; i > destY;i--) {
            struct Location l;
            l.x = x;
            l.y = i;
            locations[currentLocation] = l;
            currentLocation += 1;
          }
          y -= amount;
        }
        else
        {
          int destX = x - amount;
          for (int i = x; i > destX;i--) {
            struct Location l;
            l.x = i;
            l.y = y;
            locations[currentLocation] = l;
            currentLocation += 1;
          }
          x -= amount;
        }
        if (cc == EOF)
        {
          break;
        }
      }
      else
      {
        entry[entryIndex] = cc;
        entryIndex += 1;
      }
    }
  }
  for (int i = 0; i < currentLocation;i++) {
    for (int ii = 0; ii< currentLocation;ii++) {
      if (i != ii) {
        struct Location l1 = locations[i];
        struct Location l2 = locations[ii];
        if (l1.x == l2.x && l1.y == l2.y) {
          printf("part 2: %d\n", abs(l1.x) + abs(l1.y));
          goto fileClose;
        }

      }
    }
  }

  fileClose:
  fclose(fp);
  QueryPerformanceCounter(&end);

  elapsed = (double)(end.QuadPart - start.QuadPart) / frequency.QuadPart;
  printf("Elapsed time: %.6f microseconds\n", elapsed * 1000000);
  printf("part 1: %d\n", abs(x) + abs(y));

}