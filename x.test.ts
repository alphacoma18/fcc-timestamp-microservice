function x(date: string) {
    try {
        const z = new Date(date)
		if (z) throw "Invalid Date";
		return;
	} catch (err) {
		return { err };
	}
}
console.log(
    x("this-is-not-a-date")
);

// test("testing x", () => {
// 	expect("this-is-not-a-date").toEqual({ error: "Invalid Date" });
// });
