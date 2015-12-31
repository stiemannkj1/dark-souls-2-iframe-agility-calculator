/**
The MIT License (MIT)

Copyright (c) 2016 Kyle J. Stiemann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var index = {

	ADAPT_MIN: 3,
	ATTUNE_MIN: 2,
	MAX: 99,

	calculateAgility: function(ADAPT_INPUT_ID, ATTUNE_INPUT_ID) {

		var adaptInput = document.getElementById(ADAPT_INPUT_ID),
		ADAPT = parseInt(adaptInput.value, 10),
		attuneInput = document.getElementById(ATTUNE_INPUT_ID),
		ATTUNE = parseInt(attuneInput.value, 10),

		// The algorithm used to calculate agility is from the Dark Souls 2 Wikidot Agility Article:
		// http://darksouls2.wikidot.com/agility#toc2
		// The algorithm is republished here for non-profit educational purposes.
		ADAPT3_PLUS_ATTUNE = (ADAPT * 3) + ATTUNE;

		if (ADAPT3_PLUS_ATTUNE > 120) {
			return (((ADAPT3_PLUS_ATTUNE - 120) / 28) + 110);
		}
		else {
			return ((ADAPT3_PLUS_ATTUNE / 4) + 80);
		}
	},

	decrement: function(INPUT_ID, MIN) {

		var input = document.getElementById(INPUT_ID);

		if (input.value > MIN) {

			input.oldValue = input.value;
			input.value--;
		}
	},

	getBackstepIFrames: function(agility) {

		var iFrames;

		// The values used to calculate backstep iFrames come from the Dark Souls 2 Wikidot Agility Article:
		// http://darksouls2.wikidot.com/agility#toc2
		// They are republished here for non-profit educational purposes.
		if (agility >= 113) {
			iFrames = 9;
		} else if (agility >= 108) {
			iFrames = 8;
		} else if (agility >= 100) {
			iFrames = 7;
		} else if (agility >= 91) {
			iFrames = 6;
		} else if (agility >= 87) {
			iFrames = 5;
		} else if (agility >= 85) {
			iFrames = 3;
		} else {

			// I'm not sure if this is true, but I can't find any data about iFrames below 85 agility.
			iFrames = 3;
		}

		return iFrames;
	},

	getRollIFrames: function(agility) {

		var iFrames;

		// The values used to calculate fast roll iFrames come from vegeta311's Agility and iFrame correlation data. reddit post:
		// https://www.reddit.com/r/DarkSouls2/comments/25lnny/agility_and_iframe_correlation_data/
		// They are republished here for non-profit educational purposes.
		if (agility >= 116) {
			iFrames = 16;
		} else if (agility >= 114) {
			iFrames = 15;
		} else if (agility >= 111) {
			iFrames = 14;
		} else if (agility >= 105) {
			iFrames = 13;
		} else if (agility >= 99) {
			iFrames = 12;
		} else if (agility >= 96) {
			iFrames = 11;
		} else if (agility >= 92) {
			iFrames = 10;
		} else if (agility >= 88) {
			iFrames = 9;
		} else if (agility >= 86) {
			iFrames = 8;
		} else if (agility >= 85) {
			iFrames = 5;
		} else {

			// I'm not sure if this is true, but I can't find any data about iFrames below 85 agility.
			iFrames = 5;
		}

		return iFrames;
	},

	increment: function(INPUT_ID) {

		var input = document.getElementById(INPUT_ID);

		if (input.value < index.MAX) {

			input.oldValue = input.value;
			input.value++;
		}
	},

	validate: function(input, MIN) {

		var INPUT_ID = input.id;
		var validationRegExp = new RegExp("^[0-9]?[" + MIN + "-9]$");

		if (validationRegExp.test(input.value)) {
			document.getElementById(INPUT_ID + '_error').className = 'hidden';
		} else {

			document.getElementById(INPUT_ID + '_error_value').innerHTML = input.value;
			document.getElementById(INPUT_ID + '_error').className = 'alert alert-danger';
			input.value = input.oldValue;
		}
	}
}
