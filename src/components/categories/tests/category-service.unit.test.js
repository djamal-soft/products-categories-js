const ResourceNotFoundError = require("../../../common/exceptions/business/resource-not-found-error");
const CategoryService = require("../category-service");
const MockCategoryRepository = require("./mocks/mock-category-repository");
const MockCategoryValidator = require("./mocks/mock-category-validator");
const { 
    arrayOfCategoriesWithoutHierarchy, 
    arrayOfCategoriesWithHierarchy, 
    categoryWithId2WithoutChildren, 
    categoryWithId2WithChildren 
} = require("./mocks/test-data");


describe('Category service specs', () => {

    const categoryRepository = new MockCategoryRepository();
    const categoryValidator  = new MockCategoryValidator;
    const categoryService    = new CategoryService(categoryRepository, categoryValidator);

    test('get all gategories without hierarchy', async () => {
        const result = await categoryService.findAll();

        expect(result).toMatchObject(arrayOfCategoriesWithoutHierarchy);
    });

    test('get all gategories with hierarchy', async () => {
        const result = await categoryService.findAll(true);

        expect(result).toMatchObject(arrayOfCategoriesWithHierarchy);
    });

    test('get single category without children', async () => {
        const result = await categoryService.findById(2);

        expect(result).toMatchObject(categoryWithId2WithoutChildren);
    });

    test('get single category with children', async () => {
        const result = await categoryService.findById(2, true);

        expect(result).toMatchObject(categoryWithId2WithChildren);
    });

    test('get single category throws not found error', async () => {
        await expect(
            categoryService.findById(1001)
        ).rejects.toThrow(ResourceNotFoundError);
    });

})