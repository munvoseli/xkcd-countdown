#include <curl/curl.h>
#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void stateCallback(void* datap, size_t size, size_t nmemb, void* userp) {
	char* cdatap = (char*) datap;
	char* cuserp = (char*) userp;
	char isDifferent = strncmp(cdatap + 8, cuserp, 64);
	if (isDifferent) {
		printf("Different!\n%s\n", cdatap);
		for (unsigned char i = 0; i < 64; ++i) {
			(cuserp)[i] = (cdatap)[i + 8];
		}
		FILE* fp = fopen("frames.txt", "a");
		fprintf(fp, "%s\n", cuserp);
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
		sleep(5);
	}
	return 0;
}
