import { Card } from "react-bootstrap";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from "recharts";
import { useTheme } from "../../theme";

const data = [
    {
        name: "Page A",
        pv: 2400,
    },
    {
        name: "Page B",
        pv: 1398,
    },
    {
        name: "Page C",
        pv: 9800,
    },
    {
        name: "Page D",
        pv: 3908,
    },
    {
        name: "Page E",
        pv: 4800,
    },
    {
        name: "Page F",
        pv: 3800,
    },
    {
        name: "Page G",
        pv: 4300,
    },
];

const SimpleLineChart = () => {
    const theme = useTheme();

    return (
        <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={200} data={data}>
                    <Line type="monotone" dataKey="pv" stroke={theme.mainColor} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const data1 = [
    {
        name: "Page A",
        uv: 4000,
    },
    {
        name: "Page B",
        uv: 3000,
    },
    {
        name: "Page C",
        uv: 2000,
    },
    {
        name: "Page D",
        uv: 2780,
    },
    {
        name: "Page E",
        uv: 1890,
    },
    {
        name: "Page F",
        uv: 2390,
    },
    {
        name: "Page G",
        uv: 3490,
    },
];

const SimpleBarChart = () => {
    const theme = useTheme();

    return (
        <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={data1}>
                    <Bar dataKey="uv" fill={theme.mainLight} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export const UsersLineChartCard = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Header>Users</Card.Header>
                <SimpleLineChart />
            </Card.Body>
        </Card>
    );
};

export const ExamsBarChartCard = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Header>Exams</Card.Header>
                <SimpleBarChart />
            </Card.Body>
        </Card>
    );
};
