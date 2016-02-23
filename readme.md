unique-wallpaper
================

The aim of this project is to generate 'procedural' distinct wallpaper like
graphics.

It takes a seed (integer) and recursively uses a pseudo-random number generator
to construct an svg image.

usage
----

Using node.js run:
 `node index.js --key 54`
to generate the image with the key `54` as `out.svg`.

For testing/batch use tun:
  `node index.js --count 500`
to generate 500 images in a directory named `out`.
