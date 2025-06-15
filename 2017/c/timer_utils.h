// timer_utils.c or timer_utils.h — use same file in multiple programs
#ifndef TIMER_UTILS_H
#define TIMER_UTILS_H

#include <windows.h>

static LARGE_INTEGER _timer_freq;
static LARGE_INTEGER _timer_start;

static void timer_start() {
    QueryPerformanceFrequency(&_timer_freq);
    QueryPerformanceCounter(&_timer_start);
}

static double timer_elapsed_microseconds() {
    LARGE_INTEGER end;
    QueryPerformanceCounter(&end);
    return (double)(end.QuadPart - _timer_start.QuadPart) * 1e6 / _timer_freq.QuadPart;
}

#endif // TIMER_UTILS_H
