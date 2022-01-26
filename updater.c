#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <curl/curl.h>
#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif
#include <curses.h>

#include "music.c"

typedef struct Succode {
	unsigned char code; // 0: NULL, 1: err, 2: suc, 3: new
	size_t n;
} Succode;

typedef struct Apioform {
	char hash[65];
	char errorTracker;
	char curr_code;
	char jsonstr[512];
	size_t n_succode;
	Succode a_succode[20];
} Apioform;


static void printSuccodeRecords(Succode* a_succode, size_t n_succode) {
	for (int i = 0; i < 20; ++i)
		mvprintw(i + 1, 5, "%d %d", a_succode[i].code, a_succode[i].n);
	mvprintw(0 + n_succode, 2, "  ");
	mvprintw(1 + n_succode, 2, "->");
}

static void printStatus(const char* status) {
	move(21, 0);
	clrtoeol();
	mvprintw(21, 0, status);
}

static void printGeorge(Apioform* georgep) {
	clear();
	printSuccodeRecords(georgep->a_succode, georgep->n_succode);
	static const char* messages[] = {
		"NULL", "Error in request", "Same.", "Different!"
	};
	printStatus(messages[georgep->curr_code]);
	time_t utcSec = time(NULL);
	struct tm* utcTim = gmtime(&utcSec); // Tim is the keeper of all clocks
	mvprintw(22,0, "%d-%d %d:%d:%d  ", utcTim->tm_mon + 1, utcTim->tm_mday, utcTim->tm_hour, utcTim->tm_min, utcTim->tm_sec);
	mvprintw(23,0, "%s", georgep->jsonstr);
	refresh();
}

static size_t stateCallback(void* datap, size_t size, size_t nmemb, void* userp) {
	size_t acsize = size * nmemb;
	char* cdatap = (char*) datap;
	Apioform* georgep = (Apioform*) userp;
	georgep->errorTracker = 1; // error tracking
	char isDifferent = strncmp(cdatap + 8, georgep->hash, 64);
	time_t utcSec = time(NULL);
	struct tm* utcTim = gmtime(&utcSec); // Tim is the keeper of all clocks
	strncpy(georgep->jsonstr, cdatap, acsize);
	georgep->jsonstr[acsize] = 0;
	if (isDifferent) {
		georgep->curr_code = 3;
		printStatus("Different");
		for (unsigned char i = 0; i < 64; ++i) {
			georgep->hash[i] = (cdatap)[i + 8];
		}
		FILE* fp = fopen("frames.txt", "a");
		fprintf(fp, "%s   %d-%d %d:%d:%d\n", cdatap, utcTim->tm_mon + 1, utcTim->tm_mday, utcTim->tm_hour, utcTim->tm_min, utcTim->tm_sec);
		fclose(fp);
	} else {
		georgep->curr_code = 2;
		printStatus("Same.");
	}
	return acsize;
}

int main() {
	curl_global_init(CURL_GLOBAL_ALL);
	initscr();
	refresh();
	curs_set(0);
	Apioform george;
	george.hash[0] = 0;
	george.hash[64] = 0;
	george.jsonstr[0] = 0;
	for (int i = 0; i < 20; ++i) {
		george.a_succode[i].code = 0;
		george.a_succode[i].n = 0;
	}
	george.n_succode = 0;
	char* errarr[] = {"ffplay", "-loglevel", "-8", "-autoexit", MEGALOVANIA, NULL};
	CURLcode res;
	CURL* curl = curl_easy_init();
	curl_easy_setopt(curl, CURLOPT_URL,
		"https://xkcd.com/count-wimRikmef/state");
	curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, stateCallback);
	curl_easy_setopt(curl, CURLOPT_WRITEDATA, &george);
	curl_easy_setopt(curl, CURLOPT_TIMEOUT, 20L);
	for(;;) {
		george.errorTracker = 0;
		printStatus("Making request...   ");
//		fflush(stdout);
//		printStatus("ksdfjlsf");
		res = curl_easy_perform(curl);
		if (george.errorTracker == 0) {
//			printf(":(\n");
			// alternatively, popen
//			if (fork() == 0) {
//				execv("/bin/ffplay", errarr);
//				return 0;
//			}
			system("/bin/ffplay -loglevel -8 -autoexit -nodisp " MEGALOVANIA);
			george.curr_code = 1;
			printStatus("Error in request!");
		}
		if (george.a_succode[george.n_succode].code != george.curr_code) {
			++george.n_succode;
			george.n_succode %= 20;
			george.a_succode[george.n_succode].code = george.curr_code;
		}
//		mvprintw(4,0, "%d %d", george.n_succode, george.a_succode[george.n_succode].n);
		george.a_succode[george.n_succode].n += 1;
//		printSuccodeRecords(george.a_succode, george.n_succode);
		printGeorge(&george);
		sleep(6);
//		getch();
	}
	endwin();
	curl_global_cleanup();
	return 0;
}
