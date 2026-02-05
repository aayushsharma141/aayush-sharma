import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectGalleryItem extends Struct.ComponentSchema {
  collectionName: 'components_project_gallery_items';
  info: {
    displayName: 'Gallery Item';
  };
  attributes: {
    images: Schema.Attribute.JSON;
    room: Schema.Attribute.String;
  };
}

export interface ProjectMaterial extends Struct.ComponentSchema {
  collectionName: 'components_project_materials';
  info: {
    displayName: 'Material';
  };
  attributes: {
    details: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface ProjectTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_project_testimonials';
  info: {
    displayName: 'Testimonial';
  };
  attributes: {
    author: Schema.Attribute.Text;
    quote: Schema.Attribute.Text;
    role: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.gallery-item': ProjectGalleryItem;
      'project.material': ProjectMaterial;
      'project.testimonial': ProjectTestimonial;
    }
  }
}
