const { ChakraProvider, Box, Image, Text, Heading, Flex, Button } = window.ChakraUIReact;

function ProductCard({ product, onSelect }) {
  return (
    React.createElement(Box, { borderWidth: '1px', borderRadius: 'lg', overflow: 'hidden', p: '4', maxW: 'sm' },
      React.createElement(Image, { src: product.image, alt: product.name }),
      React.createElement(Heading, { size: 'md', mt: '2' }, product.name),
      React.createElement(Text, null, product.description),
      React.createElement(Text, { fontWeight: 'bold' }, `$${product.price}`),
      React.createElement(Button, { mt: '2', colorScheme: 'teal', onClick: () => onSelect(product.id) }, 'View')
    )
  );
}

function ProductPage() {
  const [products, setProducts] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    window.api.fetchProducts().then(setProducts).catch(console.error);
  }, []);

  const handleSelect = (id) => {
    window.api.fetchProduct(id).then(setSelected).catch(console.error);
  };

  return (
    React.createElement(ChakraProvider, null,
      React.createElement(Flex, { p: '4', wrap: 'wrap', gap: '4' },
        products.map(p => React.createElement(ProductCard, { key: p.id, product: p, onSelect: handleSelect }))
      ),
      selected && React.createElement(Box, { p: '4', className: 'product-detail' },
        React.createElement(Heading, null, selected.name),
        React.createElement(Image, { src: selected.image, alt: selected.name }),
        React.createElement(Text, { mt: '2' }, selected.description),
        React.createElement(Text, { fontWeight: 'bold', mt: '2' }, `$${selected.price}`),
        React.createElement(Button, { colorScheme: 'teal', mt: '2' }, 'Add to Cart')
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(ProductPage));
