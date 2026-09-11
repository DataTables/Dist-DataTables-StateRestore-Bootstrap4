/*! StateRestore Bootstrap 4 styling 2.0.0 for DataTables
 * Copyright (c) SpryMedia Ltd - datatables.net/license
 */

(function(factory){
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['datatables.net-bs4', 'datatables.net-staterestore'], function (dt) {
			return factory(window, document, dt);
		});
	}
	else if (typeof exports === 'object') {
		// CommonJS
		var cjsRequires = function (root) {
			if (! root.DataTable) {
				require('datatables.net-bs4')(root);
			}

			if (! window.DataTable.StateRestore) {
				require('datatables.net-staterestore')(root);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root) {
				if (! root) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				cjsRequires(root);
				return factory(root, root.document, root.DataTable);
			};
		}
		else {
			cjsRequires(window);
			module.exports = factory(window, window.document, window.DataTable);
		}
	}
	else {
		// Browser
		factory(window, document, window.DataTable);
	}
}(function(window, document, DataTable) {
'use strict';

var Dom = DataTable.Dom;
var util = DataTable.util;

let bsModal;
const StateRestore = DataTable.StateRestore;
const domEls = {
    modal: Dom.c('div')
        .classAdd('modal fade dtsr-modal')
        .append(Dom.c('div')
        .classAdd('modal-dialog modal-dialog-centered')
        .append(Dom.c('div')
        .classAdd('modal-content')
        .append(Dom.c('div')
        .classAdd('modal-header')
        .append(Dom.c('h5').classAdd('modal-title'))
        .append(Dom.c('button')
        .classAdd('close')
        .attr({
        type: 'button',
        'aria-label': 'Close'
    })
        .append(Dom.c('span')
        .attr('aria-hidden', 'true')
        .html('&times;'))))
        .append(Dom.c('div').classAdd('modal-body'))))
};
/*
 * Bootstrap modal for StateRestore.
 */
StateRestore.modal = function (title, content, className, closeCb) {
    let $ = DataTable.use('jq');
    if (!bsModal) {
        bsModal = $(domEls.modal.get(0)).modal({
            backdrop: 'static',
            keyboard: false,
            show: false
        });
    }
    let header = domEls.modal.find('div.modal-header h5');
    let body = domEls.modal.find('div.modal-body');
    let close = domEls.modal.find('button.close');
    // Display the content
    header.text(title);
    body.append(content);
    domEls.modal.find('div.modal-dialog').classAdd(className);
    // Close event handler
    close.on('click.dtsr', () => {
        closeCb();
    });
    domEls.modal.on('click.dtsr', e => {
        if (Dom.s(e.target).classHas('modal')) {
            closeCb();
        }
    });
    domEls.modal.appendTo('body');
    bsModal.modal('show');
};
StateRestore.modalClean = function () {
    let header = domEls.modal.find('div.modal-header h5');
    let body = domEls.modal.find('div.modal-body');
    let close = domEls.modal.find('button.close');
    header.text('');
    body.empty();
    domEls.modal
        .find('div.modal-dialog')
        .classRemove(StateRestore.classes.modal.table);
    close.off('.dtsr');
    domEls.modal.off('.dtsr');
};
StateRestore.modalClose = function () {
    if (bsModal) {
        bsModal.modal('hide');
    }
};
/*
 * Setup classes for integration
 */
util.object.assignDeep(StateRestore.classes, {
    field: {
        checkboxOption: 'form-check',
        container: 'form-group',
        error: 'invalid-feedback',
        info: 'form-text text-muted',
        label: '',
        value: '',
        input: {
            checkbox: 'form-check-input',
            text: 'form-control'
        }
    },
    modal: {
        button: 'float-right btn btn-primary',
        table: 'modal-lg'
    },
    table: {
        table: 'table table-striped table-hover',
        button: 'btn btn-secondary btn-sm'
    }
});


return DataTable;
}));
