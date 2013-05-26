BASE = .

build:
	jshint widearea.js && cd build && node build.js

.PHONY: build