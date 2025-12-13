#!/bin/bash
cd /home/container

# Make internal Docker IP address available to processes.
export INTERNAL_IP=`ip route get 1 | awk '{print $(NF-2);exit}'`


## if auto_update is not set or to 1 update
if [ -z ${AUTO_UPDATE} ] || [ "${AUTO_UPDATE}" == "1" ]; then
	# Branch sistemi: staging, aux01, aux02, aux03 için -beta parametresi eklenir
	# Branch null/boş ise normal public branch kullanılır
	STEAMCMD_UPDATE_CMD="+app_update 258550"
	
	if [ -n "${BRANCH}" ]; then
		case "${BRANCH}" in
			staging|aux01|aux02|aux03)
				STEAMCMD_UPDATE_CMD="${STEAMCMD_UPDATE_CMD} -beta ${BRANCH}"
				echo "Using beta branch: ${BRANCH}"
				;;
			*)
				echo "Warning: Unknown branch '${BRANCH}', using default public branch"
				;;
		esac
	fi
	
	./steamcmd/steamcmd.sh +force_install_dir /home/container +login anonymous ${STEAMCMD_UPDATE_CMD} +quit
else
    echo -e "Not updating game server as auto update was set to 0. Starting Server"
fi

# Replace Startup Variables
MODIFIED_STARTUP=`eval echo $(echo ${STARTUP} | sed -e 's/{{/${/g' -e 's/}}/}/g')`
echo ":/home/container$ ${MODIFIED_STARTUP}"

# Fix for Rust not starting
export LD_LIBRARY_PATH=$(pwd)/RustDedicated_Data/Plugins/x86_64:$(pwd)

# Run the Server
node /wrapper.js "${MODIFIED_STARTUP}"
