namespace Domino.IServices
{
    public interface IDominoService
    {
        Task<List<List<int>>> Resolve(List<List<int>> tiles);
        List<int> getTile(List<List<int>> tiles, int value, int indice);
        List<int> getIndexesByValue(List<List<int>> tiles, int value, List<int> indexesSolution);
        bool FindSolution(List<List<int>> tiles, List<List<int>> solution, List<int> indexesSolition, int value);
        bool tryCases(List<List<int>> tiles, List<int> indexes, List<int> indexesSolition, List<List<int>> solution, int value);
    }
}
