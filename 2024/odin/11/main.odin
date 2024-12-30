package main
import "core:fmt"
import "core:strconv"
import "core:strings"
import "core:time"

total := 0

blink :: proc(store: ^map[string]int) {
	total = 0
	tmp := make(map[string]int)
	defer delete(tmp)
	fmt.println(store)

	for k, v in store^ {
		if k == "0" {
			tmp["1"] += v
			total += v
		} else {
			len_k := len(k)

			if len_k % 2 == 0 {
				first_half_key := k[:len_k / 2]
				second_half_key := k[len_k / 2:]
				tmp[first_half_key] += v
				secondHalfKeyNum := strconv.atoi(second_half_key)
				buf: [12]byte
				secondHalfKeySanitised := strconv.itoa(buf[:], secondHalfKeyNum)
				fmt.printf(
					"key:%s, key length: %d, firsthalf:%s, secondhalf:%s.\n",
					k,
					len_k,
					first_half_key,
					secondHalfKeySanitised,
				)
				tmp[secondHalfKeySanitised] += v
				total += v * 2
			} else {
				kNum := strconv.atoi(k)
				res := kNum * 2024
				buf: [20]byte
				newKey := strconv.itoa(buf[:], res)
				fmt.printf("new key:%s,len:%d.\n", newKey, len(newKey))
				tmp[newKey] += v
				total += v
			}
		}
	}

	store^ = tmp
}

main :: proc() {
	input: string = "554735 45401 8434 0 188 7487525 77 7"
	start := time.tick_now()
	tokens := strings.split(input, " ")

	stoneMap := make(map[string]int)

	for token in tokens {
		stoneMap[token] += 1
	}
  stoneMap["500"] += 55
  stoneMap["501"] += 100
  stoneMap["502"] += 1
  stoneMap["503"] += 1
  stoneMap["504"] += 1
  stoneMap["505"] += 1
  fmt.println(stoneMap)

	for _ in 0 ..< 25 {
		total = 0
		tmp := make(map[string]int)
		defer clear(&tmp)

		for k, v in stoneMap {
			if k == "0" {
				tmp["1"] += v
				total += v
			} else {
				len_k := len(k)

				if len_k % 2 == 0 {
					first_half_key := k[:len_k / 2]
					second_half_key := k[len_k / 2:]
					tmp[first_half_key] += v
					secondHalfKeyNum := strconv.atoi(second_half_key)
					buf: [12]byte
					secondHalfKeySanitised := strconv.itoa(buf[:], secondHalfKeyNum)
					tmp[secondHalfKeySanitised] += v
					total += v * 2
				} else {
					kNum := strconv.atoi(k)
					res := kNum * 2024
					buf: [20]byte
					newKey := strconv.itoa(buf[:], res)
					tmp[newKey] += v
					total += v
				}
			}
		}

		stoneMap = tmp
	}


  microseconds := time.duration_microseconds(time.tick_since(start))
	fmt.printf("%f microseconds\n", microseconds)
	fmt.println("Part 1:", total)
	// part1 := stone_map.total;

	// for _ in 0..50 {
	//     blink(&stone_map);
	// }


	// core.printf("Part 1: %d\n", part1);
	// core.printf("Part 2: %d\n", stone_map.total);
	// core.printf("Time taken: %dms\n", core.time_diff_ms(start_time, end_time));
}
