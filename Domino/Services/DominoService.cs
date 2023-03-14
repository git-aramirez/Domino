using Domino.IServices;

namespace Domino.Services
{
    public class DominoService : IDominoService
    {
        public bool FindSolution(List<List<int>> tiles, List<List<int>> solution, List<int> indexesSolition, int value)
        {
            bool isSameLength = tiles.Count == solution.Count;
            if (isSameLength)
            {
                var fistValue = solution[0][0];
                var lastValue = solution[solution.Count-1][1];

                if (fistValue == lastValue)
                {
                    return true;
                }

                return false;
            }
            List<int> indexes = getIndexesByValue(tiles, value, indexesSolition);
            bool isSolution = tryCases(tiles, indexes, indexesSolition, solution, value);

            return isSolution;
        }

        public List<int> getIndexesByValue(List<List<int>> tiles, int value, List<int> indexesSolution)
        {
            var indices = new List<int>();
            for (int i = 0; i < tiles.Count; i++)
            {
                var isContained = indexesSolution.Contains(i);
                if (isContained)
                {
                    continue;
                }

                var isValueInsideTitle = tiles[i][0] == value || tiles[i][1] == value;
                if (isValueInsideTitle)
                {
                    indices.Add(i);
                }
            }

            return indices;
        }

        public List<int> getTile(List<List<int>> tiles, int value, int indice)
        {
            List<int> tile = new List<int>();

            if (tiles[indice][0] == value)
            {
                tile =  tiles[indice];
            }
            else if (tiles[indice][1] == value)
            {
                tile = Enumerable.Reverse(tiles[indice]).ToList();
            }

            return tile;
        }

        public async Task<List<List<int>>> Resolve(List<List<int>> tiles)
        {
            var solution = new List<List<int>>();
            var attempts = tiles.Count;
            bool result = false;
            var indexesSolution = new List<int>();

            while (attempts > 0 && !result)
            {
                solution.Add(tiles[0]);
                indexesSolution.Add(0);
                result = FindSolution(tiles, solution, indexesSolution, tiles[0][1]);

                if (!result)
                {
                    solution.RemoveAt(0);
                    tiles[0] = Enumerable.Reverse(tiles[0]).ToList();
                    solution.Add(tiles[0]);
                    result = FindSolution(tiles, solution, indexesSolution, tiles[0][1]);
                }

                if (!result)
                {
                    solution.RemoveAt(0);
                    var ficha = tiles[0];
                    tiles.RemoveAt(0);
                    tiles.Add(ficha);
                }

                attempts--;
            }

            return solution;
        }

        public bool tryCases(List<List<int>> tiles, List<int> indexes, List<int> indexesSolition, List<List<int>> solution, int value)
        {
            bool isSolution = false;
            for (int i = 0; i < indexes.Count && !isSolution; i++)
            {
                var tile = getTile(tiles, value, indexes[i]);
                solution.Add(tile);
                indexesSolition.Add(indexes[i]);
                isSolution = FindSolution(tiles, solution, indexesSolition, tile[1]);

                if (!isSolution)
                {
                    solution.RemoveAt(solution.Count-1);
                    indexesSolition.RemoveAt(indexesSolition.Count-1);
                }
            }

            return isSolution;
        }
    }
}
