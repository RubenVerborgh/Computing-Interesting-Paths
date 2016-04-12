/**
 * The control panel.
 */
var Panel = {
    getFinder: function() {
        var query = window.location.search,
            match = query.match(/method=(.+)/),
            method = match ? match[1] : '';

        var finder,
            allowDiagonal = true;
            biDirectional = false;
            dontCrossCorners = false;
            weight = 1;
            heuristic = 'manhattan';

        switch (method) {
        case 'astar':
            finder = new PF.AStarFinder({
                allowDiagonal: allowDiagonal,
                dontCrossCorners: dontCrossCorners,
                heuristic: PF.Heuristic[heuristic],
                weight: weight
            });
            break;
         default:
            finder = new PF.DijkstraFinder({
                allowDiagonal: allowDiagonal,
                dontCrossCorners: dontCrossCorners
            });
        }

        return finder;
    }
};
