/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ui5module/ui5module/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});