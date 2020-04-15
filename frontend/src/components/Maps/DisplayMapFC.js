import React, { useState } from "react";
import { toast } from "../Toast/Toast";
import { IonInput, IonButton, IonItem, IonLabel, IonText } from "@ionic/react";

import Red from "./Red.svg";
import Blue from "./Blue.svg";
import Green from "./Green.svg";

import cords from "./cord.json";

import someShit from "./object.json";

export const DisplayMapFC = ({ currentLocation }) => {
	const mapRef = React.useRef(null);
	const [gg, setgg] = useState(null);

	React.useLayoutEffect(() => {
		if (!mapRef.current) return;
		if (!currentLocation) return;
		const H = window.H;
		const platform = new H.service.Platform({
			apikey: "GNlK1kK3P7tTxS5vrdpv4QcgVHRjxQ-DJarCupZQms0"
		});
		const defaultLayers = platform.createDefaultLayers();
		const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
			center: { lat: currentLocation.lat, lng: currentLocation.lon },
			zoom: 4,
			pixelRatio: window.devicePixelRatio || 1
		});

		setgg(hMap);

		const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

		const ui = H.ui.UI.createDefault(hMap, defaultLayers);

		console.log(behavior, ui);

		const request = {
			waypoint0: `geo!${52.516858379},${13.3884717}`,
			waypoint1: `geo!${52.51733824},${13.394678415}`,
			mode: "fastest;car;traffic:disabled",
			avoidareas: "52.517100760,13.3905424488;52.5169701849,13.391808451",
			representation: "display"
		};
		// console.log(nearbyBloodBankLatitude);
		const router = platform.getRoutingService();
		router.calculateRoute(request, response => {
			const shape = response.response.route[0].shape.map(x => x.split(","));
			const linestring = new H.geo.LineString();
			shape.forEach(s => linestring.pushLatLngAlt(s[0], s[1]));
			const routeLine = new H.map.Polyline(linestring, {
				style: { strokeColor: "red", lineWidth: 3 }
			});

			hMap.addObject(routeLine);
			hMap.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
		});

		//52.517100760,13.3905424488;52.5169701849,13.391808451
		const avoidMarker = new H.map.Icon(Red);
		const avoidLocation = new window.H.map.Marker(
			{ lat: 52.51710076, lng: 13.3905424488 },
			{ icon: avoidMarker }
		);

		const avoidLocation1 = new window.H.map.Marker(
			{ lat: 52.5169701849, lng: 13.391808451 },
			{ icon: avoidMarker }
		);
		hMap.addObject(avoidLocation1);
		hMap.addObject(avoidLocation);

		//user location
		const userMarker = new H.map.Icon(Blue);
		const donorLocation = new window.H.map.Marker(
			{
				lat: 52.516858379,
				lng: 13.3884717
			},
			{ icon: userMarker }
		);
		hMap.addObject(donorLocation);

		//des marker
		const desMarker = new H.map.Icon(Green);
		const donorLocation1 = new window.H.map.Marker(
			{
				lat: 52.51733824,
				lng: 13.394678415
			},
			{ icon: desMarker }
		);
		hMap.addObject(donorLocation1);

		return () => {
			hMap.dispose();
		};
	}, [mapRef, currentLocation]);

	const ggFun = () => {
		let markerObjs = [];

		let tmep = new window.H.map.Marker({
			lat: cords[0].lati,
			lng: cords[0].longi
		});

		console.log(tmep);
		console.log(cords[0].longi);
		for (let i in cords) {
			let temp = new window.H.map.Marker({
				lat: cords[i].lati,
				lng: cords[i].longi
			});
			markerObjs.push(temp);
			gg.addObject(temp);
			console.log("obj", temp);
		}

		console.log(someShit);

		const donorLocation = new window.H.map.Marker({
			lat: currentLocation.lat,
			lng: currentLocation.lon
		});
		gg.addObject(donorLocation);
		toast("Noob", 4000);
	};

	const someSHit = "70vh";

	const la = 52.51733824;
	const lo = 13.394678415;
	return (
		<>
			<div className="map" ref={mapRef} style={{ height: someSHit }} />
			<IonItem>
				<IonLabel>Enter Destination</IonLabel>
			</IonItem>
			<IonItem>
				<IonLabel>Lat: </IonLabel>
				<IonInput val={la} />
				<IonLabel>Lon: </IonLabel>
				<IonInput val={lo} />
				<IonButton onClick={ggFun}>Show Route</IonButton>
			</IonItem>

			<IonItem>
				<IonItem>
					<IonText>
						Your Location
						<img src={Blue} height="50px" width="50px" alt="" />
					</IonText>
				</IonItem>
				<IonItem>
					<IonText>
						Destination
						<img src={Green} height="50px" width="50px" alt="" />
					</IonText>
				</IonItem>
				<IonItem>
					<IonText>
						Unsafe Location
						<img src={Red} height="50px" width="50px" alt="" />
					</IonText>
				</IonItem>
			</IonItem>
		</>
	);
};