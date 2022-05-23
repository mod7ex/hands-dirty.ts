namespace Events {
	/*
        // Event delegation
        <ul id="parent">
            <li id="item-1"></li>
            <li id="item-2"></li>
            <li id="item-3"></li>
            <li id="item-4"></li>
            <li id="item-5"></li>
            <li id="item-6"></li>
            <li id="item-7"></li>
            <li id="item-8"></li>
        </ul>

        // assigning an event handler for each li element is a bit expensive so
        // we assign one single event handler into ul and thanks to event bubling we can handle 
        // events occuring in each li element
    */

	document.getElementById("parent")?.addEventListener("click", function (e) {
		let targetId: string | undefined = e.target?.id;
		// do the rest ...
	});
}
