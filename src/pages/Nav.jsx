function CustomNavigation() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 240, flexShrink: 0, p: 2 }}>
      {NAVIGATION.map((item, index) => (
        <React.Fragment key={index}>
          {item.kind === 'header' && (
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
              {item.title}
            </Typography>
          )}
          
          {item.kind === 'divider' && <Divider sx={{ my: 1 }} />}
          
          {item.path && (
            <Button
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                px: 2,
                py: 1.5,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              {item.title}
            </Button>
          )}
          
          {item.children && (
            <Box sx={{ pl: 2 }}>
              {item.children.map((child, childIndex) => (
                <Button
                  key={childIndex}
                  startIcon={child.icon}
                  onClick={() => navigate(child.path)}
                  sx={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    px: 2,
                    py: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  {child.title}
                </Button>
              ))}
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}