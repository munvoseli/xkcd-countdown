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

void stateCallback(void* datap, size_t size, size_t nmemb, void* userp) {
	char* cdatap = (char*) datap;
	char* cuserp = (char*) userp;
	char isDifferent = strncmp(cdatap + 8, cuserp, 64);
	time_t utcSec = time(NULL);
	struct tm* utcTim = gmtime(&utcSec); // Tim is the keeper of all clocks
	printf("%d-%d %d:%d     ", utcTim->tm_mon + 1, utcTim->tm_mday, utcTim->tm_hour, utcTim->tm_sec);
	if (isDifferent) {
		printf("Different!\n%s\n", cdatap);
		for (unsigned char i = 0; i < 64; ++i) {
			(cuserp)[i] = (cdatap)[i + 8];
		}
		FILE* fp = fopen("frames.txt", "a");
		fprintf(fp, "%s   %d-%d %d:%d\n", cdatap, utcTim->tm_mon + 1, utcTim->tm_mday, utcTim->tm_hour, utcTim->tm_sec);
		fclose(fp);
	} else {
		printf("Same.   %s\n", cuserp);
	}
}

int main() {
	char lastKnownHash[65] = {0};
	CURLcode res;
	CURL* curl = curl_easy_init();
	curl_easy_setopt(curl, CURLOPT_URL,
		"https://xkcd.com/count-wimRikmef/state");
	curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, stateCallback);
	curl_easy_setopt(curl, CURLOPT_WRITEDATA, lastKnownHash);
	for(;;) {
		printf("Making request...   ");
		res = curl_easy_perform(curl);
		sleep(60);
	}
	return 0;
}
