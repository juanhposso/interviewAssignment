const message = `MSH|^~\&|LAB|SENDING_APPLICATION|RECEIVING_APPLICATION|202404250054||ADT^A01|MSG_ID|P|
EVN||202404250054||U
PID|||PATIENT_ID^MRN12345||DOE^John Doe^^^M||19800101|M|||123 Main St^^Medellin^^COL^12345||PHONE_NUMBER^555-555-5555||||
SCH|||APPT_ID^123456|20240515^1000|20240515^1200||CLINIC^Oncology|ATTENDING_PHYSICIAN^Dr. Smith||||
RLD|||EN^SCHEDULED
DTM^01||202404250054`;

// Function to parse a segment
function parseSegment(segment) {
	return segment.split("|||").map((field) => field.split("^"));
}

// Function to parse the HL7 message
function parseMessage(message) {
	const segments = message.split("\n");
	const PIDSegment = segments
		.find((segment) => segment.startsWith("PID"))
		.split("|");
	const SCHSegment = segments
		.find((segment) => segment.startsWith("SCH"))
		.split("|");

	//console.log("PIDSegment", PIDSegment);
	console.log("SCHSegment", SCHSegment);

	const patientInfo = {
		id: PIDSegment[3],
		name: PIDSegment[5],
		dob: PIDSegment[7],
		address: PIDSegment[11],
		phone: PIDSegment[13],
	};

	const appointmentInfo = {
		type: SCHSegment[7].split("^")[1],
		id: SCHSegment[3],
		dateTime: SCHSegment[4],
		location: SCHSegment[7].split("^")[0],
		physician: SCHSegment[8],
	};

	/* for (const segment of segments) {
		const [segmentType, ...fields] = segment.split("|");
		if (!segmentType) continue;

		const parsedFields = parseSegment(fields.join("|"));

		switch (segmentType) {
			case "PID":
				patientInfo.id = parsedFields[0][0];
				patientInfo.name = parsedFields[1][0];
				patientInfo.dob = parsedFields[2][0];
				patientInfo.address = parsedFields[5].join("~");
				patientInfo.phone = parsedFields[6].split("~")[0];
				break;
			case "SCH":
				appointmentInfo.type = parsedFields[0][0];
				const [date, time, , reason, location, physician] = parsedFields[2];
				appointmentInfo.dateTime = `${date}^${time}`;
				appointmentInfo.reason = reason;
				appointmentInfo.location = location;
				appointmentInfo.physician = physician.split("~")[1];
				break;
		}
	} */

	return { patientInfo, appointmentInfo };
}

// Parse the HL7 message
const { patientInfo, appointmentInfo } = parseMessage(message);

console.log(`Patient demographics: ${patientInfo.id} \n`);
console.log(`Appointments: ${appointmentInfo.type}`);
console.log(`Appointments: ${appointmentInfo.id}`);
console.log(`Appointments: ${appointmentInfo.dateTime}`);
console.log(`Appointments: ${appointmentInfo.location}`);
console.log(`Appointments: ${appointmentInfo.physician}`);

//console.log("Patient demographics:");
//console.log(`  ID: ${patientInfo.id}`);
//console.log(`  Name: ${patientInfo.name}`);
//console.log(`  DoB: ${patientInfo.dob}`);
//console.log(`  Address: ${patientInfo.address}`);
//console.log(`  Phone: ${patientInfo.phone}`);

//console.log("\nAppointment information:");
//console.log(`  Type: ${appointmentInfo.type}`);
//console.log(`  Date/Time: ${appointmentInfo.dateTime}`);
//console.log(`  Reason: ${appointmentInfo.reason}`);
//console.log(`  Location: ${appointmentInfo.location}`);
//console.log(`  Physician: ${appointmentInfo.physician}`);
