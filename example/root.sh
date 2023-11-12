# path										owner				file mode (empty for links)
d:/anio/									anio:anio			default

d:/anio/bin/								anio:anio			default
f:/anio/bin/node							anio:anio			0750

d:/anio/storage/							anio:anio			default
l:/anio/storage/ssd							anio:anio
l:/anio/storage/hdd							anio:anio

d:/anio/tmp/								anio:anio			1777
l:/anio/tmp/ram								anio:anio

d:/anio/env/								anio:anio			default

$include environment.sh {"env":"dev"}
$include environment.sh {"env":"test"}
$include environment.sh {"env":"prod"}
