import { getPrice } from '../getPrice';
import { applyCategories } from '../applyCategories';
import type { Product, Category } from '../../types';
import { updateCategories } from '../updateCategories';

describe('test get price function', () => {
    it('should return value with price symbol', () => {
        expect(getPrice(100, '₽')).toBe('100 ₽');
        expect(getPrice(325, '$')).toBe('325 $');
    });
});


describe('test apply Categories function', () => {
    it('should return products with current category', () => {
        
        const products:Product[] = [
            {
              id: 1,
              name: 'Product 1',
              description: 'Description 1',
              price: 10,
              category: 'Электроника'
            },
            {
              id: 2,
              name: 'Product 2',
              description: 'Description 2',
              price: 20,
              category: 'Для дома'
            },
            {
                id: 3,
                name: 'Product 3',
                description: 'Description 3',
                price: 30,
                category: 'Одежда'
            },
        ];
        
        const category: Category[] = ['Одежда'];

        
        expect(applyCategories(products, category)).toEqual([{
            id: 3,
            name: 'Product 3',
            description: 'Description 3',
            price: 30,
            category: 'Одежда'
        }]);

        const two_category: Category[] = ['Одежда', 'Для дома'];

        expect(applyCategories(products, two_category)).toEqual([
        {
            id: 2,
            name: 'Product 2',
            description: 'Description 2',
            price: 20,
            category: 'Для дома'
        },    
        {
            id: 3,
            name: 'Product 3',
            description: 'Description 3',
            price: 30,
            category: 'Одежда'
        }]);
    });
});



describe('test update Categories function', () => {
    it('should return products with current category if product dont contain it, othwewise they must append it', () => {
        
        const categorise: Category[] = ['Для дома', 'Одежда'];
        const category: Category = 'Электроника';

        const new_categorise = updateCategories(categorise, category);
        expect(new_categorise).toEqual(['Для дома', 'Одежда', 'Электроника']);
        expect(updateCategories(new_categorise, category)).toEqual(['Для дома', 'Одежда']);

    });
});