const Category = require("../../category");

const categoryWithId1 = Category.fromObject({
    id: 1,
    name: 'category 1',
    parentId: null,
});

const categoryWithId3 = Category.fromObject({
    id: 3,
    name: 'category 2',
    parentId: 2,
});

const categoryWithId2WithChildren = Category.fromObject({
    id: 2,
    name: 'category 2',
    parentId: null,
    children: [
        categoryWithId3
    ]
});

const categoryWithId2WithoutChildren = Category.fromObject({
    id: 2,
    name: 'category 2',
    parentId: null,
});


const arrayOfCategoriesWithHierarchy = [categoryWithId1, categoryWithId2WithChildren];
const arrayOfCategoriesWithoutHierarchy = [categoryWithId1, categoryWithId2WithoutChildren, categoryWithId3];

module.exports = {
    categoryWithId1,
    categoryWithId2WithChildren,
    categoryWithId2WithoutChildren,
    categoryWithId3,
    arrayOfCategoriesWithHierarchy,
    arrayOfCategoriesWithoutHierarchy,
}