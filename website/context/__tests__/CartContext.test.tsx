import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import { CartProvider, useCart, CartItem } from '../CartContext'

// Test component to access context
function TestComponent() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart()

  const sampleItem: CartItem = {
    id: 1,
    name: 'Test Cable',
    price: 100,
    quantity: 1,
    image: '/test.jpg',
  }

  const sampleItem2: CartItem = {
    id: 2,
    name: 'Another Cable',
    price: 200,
    quantity: 1,
    image: '/test2.jpg',
  }

  return (
    <div>
      <div data-testid="cart-count">{cartCount}</div>
      <div data-testid="cart-total">{cartTotal}</div>
      <div data-testid="cart-items">{JSON.stringify(cart)}</div>
      <button onClick={() => addToCart(sampleItem)}>Add Item</button>
      <button onClick={() => addToCart(sampleItem2)}>Add Item 2</button>
      <button onClick={() => removeFromCart(1)}>Remove Item</button>
      <button onClick={() => updateQuantity(1, 5)}>Update Quantity</button>
      <button onClick={() => updateQuantity(1, 0)}>Update to Zero</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('CartProvider', () => {
    it('should provide cart context to children', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('0')
    })

    it('should load cart from localStorage on mount', () => {
      const savedCart: CartItem[] = [
        {
          id: 1,
          name: 'Saved Cable',
          price: 150,
          quantity: 2,
          image: '/saved.jpg',
        },
      ]
      localStorage.setItem('cableworld_cart', JSON.stringify(savedCart))

      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('300')
    })
  })

  describe('addToCart', () => {
    it('should add a new item to the cart', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')

      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
        expect(screen.getByTestId('cart-total')).toHaveTextContent('100')
      })
    })

    it('should update quantity if item already exists in cart', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')

      // Add item twice
      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      })

      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
        expect(screen.getByTestId('cart-total')).toHaveTextContent('200')
      })
    })

    it('should add multiple different items to the cart', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')
      const addButton2 = screen.getByText('Add Item 2')

      act(() => {
        addButton.click()
        addButton2.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
        expect(screen.getByTestId('cart-total')).toHaveTextContent('300')
      })
    })

    it('should save cart to localStorage when adding items', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')

      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        const savedCart = localStorage.getItem('cableworld_cart')
        expect(savedCart).toBeTruthy()
        const parsedCart = JSON.parse(savedCart!)
        expect(parsedCart).toHaveLength(1)
        expect(parsedCart[0].name).toBe('Test Cable')
      })
    })
  })

  describe('removeFromCart', () => {
    it('should remove an item from the cart', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')
      const removeButton = screen.getByText('Remove Item')

      // Add item first
      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      })

      // Remove item
      act(() => {
        removeButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
        expect(screen.getByTestId('cart-total')).toHaveTextContent('0')
      })
    })

    it('should save updated cart to localStorage after removing item', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')
      const removeButton = screen.getByText('Remove Item')

      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      })

      act(() => {
        removeButton.click()
      })

      await waitFor(() => {
        const savedCart = localStorage.getItem('cableworld_cart')
        expect(savedCart).toBeTruthy()
        const parsedCart = JSON.parse(savedCart!)
        expect(parsedCart).toHaveLength(0)
      })
    })
  })

  describe('updateQuantity', () => {
    it('should update the quantity of an item', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')
      const updateButton = screen.getByText('Update Quantity')

      // Add item first
      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      })

      // Update quantity to 5
      act(() => {
        updateButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('5')
        expect(screen.getByTestId('cart-total')).toHaveTextContent('500')
      })
    })

    it('should remove item when quantity is updated to 0', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')
      const updateToZeroButton = screen.getByText('Update to Zero')

      // Add item first
      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      })

      // Update quantity to 0
      act(() => {
        updateToZeroButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
        expect(screen.getByTestId('cart-total')).toHaveTextContent('0')
      })
    })

    it('should save updated cart to localStorage after updating quantity', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')
      const updateButton = screen.getByText('Update Quantity')

      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      })

      act(() => {
        updateButton.click()
      })

      await waitFor(() => {
        const savedCart = localStorage.getItem('cableworld_cart')
        expect(savedCart).toBeTruthy()
        const parsedCart = JSON.parse(savedCart!)
        expect(parsedCart[0].quantity).toBe(5)
      })
    })
  })

  describe('clearCart', () => {
    it('should clear all items from the cart', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')
      const addButton2 = screen.getByText('Add Item 2')
      const clearButton = screen.getByText('Clear Cart')

      // Add items first
      act(() => {
        addButton.click()
        addButton2.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
      })

      // Clear cart
      act(() => {
        clearButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
        expect(screen.getByTestId('cart-total')).toHaveTextContent('0')
      })
    })

    it('should save empty cart to localStorage after clearing', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')
      const clearButton = screen.getByText('Clear Cart')

      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      })

      act(() => {
        clearButton.click()
      })

      await waitFor(() => {
        const savedCart = localStorage.getItem('cableworld_cart')
        expect(savedCart).toBeTruthy()
        const parsedCart = JSON.parse(savedCart!)
        expect(parsedCart).toHaveLength(0)
      })
    })
  })

  describe('cartCount and cartTotal', () => {
    it('should calculate correct cart count', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')

      // Add item 3 times
      act(() => {
        addButton.click()
        addButton.click()
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('3')
      })
    })

    it('should calculate correct cart total', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')
      const addButton2 = screen.getByText('Add Item 2')

      // Item 1: $100, Item 2: $200
      act(() => {
        addButton.click()
        addButton2.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-total')).toHaveTextContent('300')
      })
    })

    it('should calculate correct totals with multiple quantities', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')
      const updateButton = screen.getByText('Update Quantity')

      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      })

      // Update to 5 units
      act(() => {
        updateButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('5')
        expect(screen.getByTestId('cart-total')).toHaveTextContent('500')
      })
    })
  })

  describe('useCart hook', () => {
    it('should throw error when used outside CartProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      expect(() => {
        render(<TestComponent />)
      }).toThrow('useCart must be used within a CartProvider')

      consoleSpy.mockRestore()
    })
  })

  describe('cart persistence', () => {
    it('should persist cart across component remounts', async () => {
      const { unmount } = render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')

      act(() => {
        addButton.click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      })

      // Unmount and remount
      unmount()

      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      // Cart should be restored from localStorage
      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
        expect(screen.getByTestId('cart-total')).toHaveTextContent('100')
      })
    })
  })
})
