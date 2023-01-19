const paperSx = {
    "& .css-1bpvgg-MuiPaper-root": {
        padding: "10rem",
    },
    '& .super-app-theme--failure': {
        backgroundColor: '#FB0102'
    },
};

const datagridSx = {
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#D9F1FC",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: "bold",
        letterSpacing: "0.05ex",
        opacity: 1,
        color: "#1B2430",
    },
    "& .MuiPaper-elevation1": {
        backgroundColor: "#F3FBFE",
    },
    "& .MuiDataGrid-cellContent": {
        wordWrap: "break-word !important",
        textAlign: "center",
        fontSize: "1.7ex",
        justifyContent: "center",
        color: "#1B2430",
        letterSpacing: "0.05ex",
        opacity: 1,
    },
    "& .MuiDataGrid-cell": {
        whiteSpace: "normal !important",
    },
    "& .MuiDataGrid-toolbarQuickFilter": {
        border: "solid",
    },
    "& .MuiChip-label": {
        textAlign: "center",
        fontSize: "1.5ex",
    },
    "& .MuiDataGrid-toolbarContainer": {
        backgroundColor: "#F7F9FC",
    },
};

const MultiStringCell = ({ value }: { value?: string[] }) => (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', fontSize: '1.6ex' }}>
        {value?.map((text, i) => (
            <div key={i} style={{ fontSize: `${i == 0 ? 2 : 1.4}ex`, }}>
                {text}
            </div>
        ))}
    </div>
)

export { paperSx, datagridSx, MultiStringCell };