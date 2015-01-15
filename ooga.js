//- JavaScript source code

//- ooga.js ~~
//                                                      ~~ (c) SRW, 11 Dec 2013
//                                                  ~~ last updated 15 Jan 2015

(function (global) {
    'use strict';

 // Pragmas

    /*global OpenSeadragon: false */

    /*jshint maxparams: 1, quotmark: single, strict: true */

    /*jslint indent: 4, maxlen: 80 */

 // Prerequisites

    if (global.hasOwnProperty('OOGA')) {
     // The namespace already exists, and that doesn't make sense ... PANIC!
        throw new Error('The `OOGA` "namespace" already exists?!');
    }

 // Declarations

    var show_urls, transform, viewer;

 // Definitions

    show_urls = function () {
     // This function needs documentation.
        var base, cols, format, rows, z;
        base = viewer.source.tilesUrl;
        cols = Math.ceil(viewer.source.width / viewer.source.tileSize) - 1;
        format = viewer.source.fileFormat;
        rows = Math.ceil(viewer.source.height / viewer.source.tileSize) - 1;
        z = viewer.source.maxLevel;
        console.log(base + z + '/0_0.' + format);
        console.log(base + z + '/' + cols + '_' + rows + '.' + format);
        return;
    };

    transform = function (evt) {
     // This function needs work because it's duplicating too much work. For
     // the given transform (which just knocks out the red channel), it could
     // definitely be streamlined by only transforming the latest tile that has
     // just been drawn, but for masks, the current approach *is* needed. Argh.
     // Read more at http://goo.gl/kyi5EH.

     /*
        if (transform.hasOwnProperty('evt') === false) {
            console.log(evt);
            transform.evt = evt;
        }
        var t = Date.now();
        while ((Date.now() - t) < 100) {
         // (deliberately block execution so I can see where it painted)
        }
     */
        var canvas, cols, ctx, i, index, j, pixels, rows, wsi;
        canvas = evt.eventSource.drawer.canvas;
        ctx = evt.eventSource.drawer.context;
        cols = canvas.width;
        rows = canvas.height;
        wsi = ctx.getImageData(0, 0, cols, rows);
     /*
        console.log(evt.tile.x,
            evt.tile.y,
            evt.tile.position.x,
            evt.tile.position.y,
            evt.tile.size.x,
            evt.tile.size.y);
        cols = evt.tile.size.x;
        rows = evt.tile.size.y;
        tile = ctx.getImageData(evt.tile.x, evt.tile.y,
            cols, rows);
     */
        pixels = wsi.data;

        for (i = 0; i < rows; i += 1) {
            for (j = 0; j < cols; j += 1) {
                index = (i * cols + j) * 4;
             // Here, we just knock out the red channel to prove that we can.
                pixels[index] = 0; // red
                //pixels[index + 1] = 0; // green
                //pixels[index + 2] = 0; // blue
                //pixels[index + 3] = 0; // alpha
            }
        }

        ctx.putImageData(wsi, 0, 0);

        //ctx.putImageData(tile, evt.tile.position.x, evt.tile.position.y);
        return;
    };

    viewer = new OpenSeadragon({
        crossOriginPolicy: 'Anonymous',
        id: 'osd-viewer',
        prefixUrl: 'http://peir-vm.path.uab.edu/openseadragon/images/',
        //showNavigator: true,
        tileSources: 'http://peir-vm.path.uab.edu/wsi/IPLab11Malaria.dzi'
        //tileSources: 'IPLab11Malaria.dzi'
    });

 // Event definitions

    viewer.addHandler('tile-drawn', transform);

 // Out-of-scope definitions

    global.OOGA = {
     // These are chiefly for debugging at the moment. The API will not be
     // set until the paper is submitted.
        show_urls: show_urls,
        viewer: viewer
    };

 // Invocations

 // That's all, folks!

    return;

}(Function.prototype.call.call(function (that) {
    'use strict';
 // See the bottom of "quanah.js" for documentation.
    /*global global: true */
    /*jslint indent: 4, maxlen: 80 */
    if (this === null) {
        return (typeof global === 'object') ? global : that;
    }
    return (typeof this.global === 'object') ? this.global : this;
}, null, this)));

//- vim:set syntax=javascript:
