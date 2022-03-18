import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'descripción del producto',
      price: 125,
      stock: 25,
      image: '',
      // 'https://www.google.com/search?q=images&rlz=1C1CHBD_esNI881NI881&sxsrf=APq-WBufa0NtJKUz1otLAm60GGwF5ymZiQ:1647389687058&tbm=isch&source=iu&ictx=1&vet=1&fir=DH7p1w2o_fIU8M%252CBa_eiczVaD9-zM%252C_%253B2nDXavJs9DoKTM%252CB51x0PBR9KNzvM%252C_%253Bn5hAWsQ-sgKo_M%252C-UStXW0dQEx4SM%252C_%253BxsU9-hejFJT5CM%252CIGA8wGA8smzP8M%252C_%253BeXUC-3WyVcZa-M%252CpaFdfaKDdCMvfM%252C_%253BUVAHTXdge9JbrM%252CtnVTsEa64LdCyM%252C_%253BITUG1uFAV1aQ9M%252CX9GBbDAacv-dWM%252C_%253BarFfSjMu_GX7sM%252CUkcvm3PybD5jEM%252C_%253BISsdmwh92GPtrM%252CtnVTsEa64LdCyM%252C_%253BMMg1IYvp7cpiyM%252CjMPx2dPKbYbCVM%252C_%253BZ3P5pHK_L9fCvM%252C3wkP0UfsW3vNTM%252C_%253BU0vgqOEAOeNqAM%252CwBLPaGF_LdhC3M%252C_&usg=AI4_-kSQVO0gv_DP14tz_cKBLm3QteYLbQ&sa=X&ved=2ahUKEwjN7-norMn2AhWwkGoFHUNXCLAQ9QF6BAgVEAE#imgrc=n5hAWsQ-sgKo_M',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
