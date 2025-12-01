#ifndef TIMER_H
#define TIMER_H

#ifdef _WIN32
#include <windows.h>
#else
#include <mach/mach_time.h>
#endif

typedef struct {
#ifdef _WIN32
    LARGE_INTEGER start;
    LARGE_INTEGER end;
    LARGE_INTEGER freq;
#else
    uint64_t start;
    uint64_t end;
    mach_timebase_info_data_t timebase;
#endif
} Timer;

static void start_timer(Timer* t) {
#ifdef _WIN32
    QueryPerformanceFrequency(&t->freq);
    QueryPerformanceCounter(&t->start);
#else
    t->start = mach_absolute_time();
    mach_timebase_info(&t->timebase);
#endif
}

static double end_timer(Timer* t) {
#ifdef _WIN32
    QueryPerformanceCounter(&t->end);
    return (double)(t->end.QuadPart - t->start.QuadPart) * 1e6 / t->freq.QuadPart; // microseconds
#else
    t->end = mach_absolute_time();
    uint64_t elapsed = t->end - t->start;
    double nanos = (double)elapsed * t->timebase.numer / t->timebase.denom;
    return nanos / 1e3; // microseconds
#endif
}

#endif // TIMER_H