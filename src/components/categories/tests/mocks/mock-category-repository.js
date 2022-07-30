const ResourceNotFoundError = require('../../../../common/exceptions/business/resource-not-found-error');
const { arrayOfCategoriesWithoutHierarchy, arrayOfCategoriesWithHierarchy, categoryWithId2WithChildren, categoryWithId2WithoutChildren } = require('./test-data');

class MockCategoryRepository {

    /**
     * Mock of findAll method.
     */
    async findAll(hierarchy = false) {
        return hierarchy 
            ? arrayOfCategoriesWithHierarchy 
            : arrayOfCategoriesWithoutHierarchy;
    }


    /**
     * Mock of findById method.
     */
    findById(id, hierarchy = false) {
        if(id !== 2) {
            throw new ResourceNotFoundError('not found');
        }

        return hierarchy ? categoryWithId2WithChildren : categoryWithId2WithoutChildren;
    }
}

module.exports = MockCategoryRepository;