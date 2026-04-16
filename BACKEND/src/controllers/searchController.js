import { SearchService } from '../services/search.service';

export const SearchController = {
    async imageSearch(req, res) {
        try {
            const vector = await SearchService.getVectorFromAI(req.file.path);
            const products = await SearchService.findSimilar(vector);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: "Lỗi AI" });
        }
    }
};