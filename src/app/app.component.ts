import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductInfo } from './productsinfo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ShoppingWebpage';
  public cartItemCount: number = 0;
  public categories: string[] = [];
  public products: ProductInfo[] = [];
  public cartItems: ProductInfo[] = [];
  public isCartItemsVisible: boolean = false;

  public LoadCategories(): void {
    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data) => {
        data.unshift('all');
        this.categories = data;
      });
  }

  public LoadProducts(url: string): void {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      });
  }

  public GetCartItemsCount(): void {
    this.cartItemCount = this.cartItems.length;
  }

  ngOnInit(): void {
    this.LoadCategories();
    this.LoadProducts('https://fakestoreapi.com/products');
    this.GetCartItemsCount();
  }
  CategoryChanged(categoryName: string) {
    if (categoryName == 'all') {
      this.LoadProducts('https://fakestoreapi.com/products');
    } else {
      this.LoadProducts(
        `https://fakestoreapi.com/products/category/${categoryName}`
      );
    }
  }
  ToggleCart() {
    this.isCartItemsVisible = this.isCartItemsVisible == false ? true : false;
  }
  RemoveItem(id: number) {
    var confirmation = confirm('Are you sure you want to delete?');
    if (confirmation == true) {
      this.cartItems.splice(id, 1);
      this.GetCartItemsCount();
    }
  }
  AddToCart(id: number) {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.cartItems.push(data);
        this.GetCartItemsCount();
      });
  }
}
