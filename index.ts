import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function getUnixAndUtx(date: string | number) {
	const basis = new Date(date);
	const unix = basis.getTime();
	const utc = basis.toUTCString();
	return { unix, utc };
}
app.get("/api/:date?", (req, res) => {
	try {
		const {
			params: { date },
		} = req;

		if (!date) {
			const dateNow = Math.floor(Date.now());
			return res.json(getUnixAndUtx(dateNow));
		}

		const checkInvalid: Date | string = new Date(parseInt(date));
		if (String(checkInvalid) === "Invalid Date") throw "Invalid Date";

		const dateRegex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
		if (dateRegex.test(date)) {
			return res.json(getUnixAndUtx(date));
		}

		const unixRegex = /^([0-9]{13})$/;
		if (unixRegex.test(date)) {
			return res.json(getUnixAndUtx(parseInt(date)));
		}
		return res.json(getUnixAndUtx(date));
	} catch (error) {
		res.json({ error });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server Listening on PORT ${PORT}`);
});
