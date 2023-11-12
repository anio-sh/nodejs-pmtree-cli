# path										owner				file mode
# Environment Configuration
d:/anio/env/<env>/							anio_<env>:anio		default

# Control Sockets
d:/anio/env/<env>/control/					anio_<env>:anio		default
?f:/anio/env/<env>/control/qmp.sock			anio_<env>:anio		default
?f:/anio/env/<env>/control/vnc.sock			anio_<env>:anio		default
?f:/anio/env/<env>/control/serial.sock		anio_<env>:anio		default
?f:/anio/env/<env>/control/monitor.sock		anio_<env>:anio		default

# Data
d:/anio/env/<env>/data/						anio_<env>:anio		default
l:/anio/env/<env>/data/os.qcow2				anio_<env>:anio
l:/anio/env/<env>/data/data.qcow2			anio_<env>:anio
l:/anio/env/<env>/data/bulk_storage.qcow2	anio_<env>:anio

# Logs
d:/anio/env/<env>/logs/						anio_<env>:anio		default
?f:/anio/env/<env>/logs/stderr.log			anio_<env>:anio		default
?f:/anio/env/<env>/logs/stdout.log			anio_<env>:anio		default

# External Storage
$include external_storage.sh {"type": "ssd","env":"<env>"}
$include external_storage.sh {"type": "hdd","env":"<env>"}

?f:/mnt/anio_ssd/env/<env>/os.qcow2			anio_<env>:anio		default
