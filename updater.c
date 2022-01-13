#include <curl/curl.h>
#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#include "music.c"

typedef struct Apioform {
	char hash[65];
	char errorTracker;
} Apioform;

size_t stateCallback(void* datap, size_t size, size_t nmemb, void* userp) {
	char* cdatap = (char*) datap;
	Apioform* georgep = (Apioform*) userp;
	georgep->errorTracker ^= 1; // error tracking
	char isDifferent = strncmp(cdatap + 8, georgep->hash, 64);
	time_t utcSec = time(NULL);
	struct tm* utcTim = gmtime(&utcSec); // Tim is the keeper of all clocks
	printf("%d-%d %d:%d:%d  ", utcTim->tm_mon + 1, utcTim->tm_mday, utcTim->tm_hour, utcTim->tm_min, utcTim->tm_sec);
	if (isDifferent) {
		printf("Different!\n%s\n", cdatap);
		for (unsigned char i = 0; i < 64; ++i) {
			georgep->hash[i] = (cdatap)[i + 8];
		}
		FILE* fp = fopen("frames.txt", "a");
		fprintf(fp, "%s   %d-%d %d:%d:%d\n", cdatap, utcTim->tm_mon + 1, utcTim->tm_mday, utcTim->tm_hour, utcTim->tm_min, utcTim->tm_sec);
		fclose(fp);
	} else {
		printf("Same.   %s\n", georgep->hash);
	}
	return nmemb;
}

int main() {
	Apioform george;
	george.hash[0] = 0;
	george.hash[64] = 0;
	george.errorTracker = 0;
	char errorTracker = 0;
	char* errarr[] = {"ffplay", "-autoexit", MEGALOVANIA, NULL};
//	char* errenv[] = {NULL};
	CURLcode res;
	CURL* curl = curl_easy_init();
	curl_easy_setopt(curl, CURLOPT_URL,
		"https://xkcd.com/count-wimRikmef/state");
	curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, stateCallback);
	curl_easy_setopt(curl, CURLOPT_WRITEDATA, &george);
	curl_easy_setopt(curl, CURLOPT_TIMEOUT, 20L);
	for(;;) {
		printf("Making request...   ");
		fflush(stdout);
		res = curl_easy_perform(curl);
		errorTracker ^= 1;
		if (errorTracker != george.errorTracker) {
			printf(":(\n");
			// alternatively, popen
			if (fork() == 0)
				execv("/bin/ffplay", errarr);
		}
		sleep(60);
	}
	return 0;
}
