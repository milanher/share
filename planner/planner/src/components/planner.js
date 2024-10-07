(() => ({
  name: 'planner',
  type: 'CONTENT_COMPONENT',
  icon: 'TitleIcon',
  orientation: 'HORIZONTAL',
  allowedTypes: [],
  jsx: (() => {
    const users = [
      {
        id: 1,
        name: 'Alice',
        role: 'LA',
        events: [
          { id: 'e1', name: 'Kickoff Meeting', startDate: '2024-10-01', endDate: '2024-10-01' },
          { id: 'e2', name: 'Weekly Standup', startDate: '2024-10-08', endDate: '2024-10-08' },
        ],
      },
      {
        id: 2,
        name: 'Bob',
        role: 'TAmp',
        events: [
          { id: 'e3', name: 'Project Review', startDate: '2024-10-03', endDate: '2024-10-03' },
        ],
      },
      {
        id: 3,
        name: 'Charlie',
        role: 'TAio',
        events: [
          { id: 'e4', name: 'Kickoff Meeting', startDate: '2024-10-01', endDate: '2024-10-01' },
          { id: 'e5', name: 'Code Review', startDate: '2021-10-07', endDate: '2021-10-07' },
        ],
      },
      {
        id: 4,
        name: 'Diana',
        role: 'TA',
        events: [
          { id: 'e6', name: 'Sprint Planning', startDate: '2024-10-06', endDate: '2024-10-06' },
          { id: 'e7', name: 'Kickoff Meeting', startDate: '2024-10-01', endDate: '2024-10-01' },
        ],
      },
      {
        id: 5,
        name: 'Eve',
        role: 'TAmp',
        events: [
          { id: 'e8', name: 'Client Demo', startDate: '2024-10-10', endDate: '2024-10-10' },
          { id: 'e9', name: 'Code Review', startDate: '2024-10-07', endDate: '2024-10-07' },
        ],
      },
      {
        id: 6,
        name: 'Frank',
        role: 'LA',
        events: [
          { id: 'e10', name: 'Project Review', startDate: '2024-10-03', endDate: '2024-10-03' },
          { id: 'e11', name: 'Weekly Standup', startDate: '2024-10-05', endDate: '2024-10-05' },
        ],
      },
      {
        id: 7,
        name: 'Grace',
        role: 'TAio',
        events: [
          { id: 'e12', name: 'Sprint Planning', startDate: '2024-10-06', endDate: '2024-10-06' },
          { id: 'e13', name: 'Client Demo', startDate: '2024-10-10', endDate: '2024-10-10' },
        ],
      },
    ];
    
    const { env, Icon } = B;
    const isDev = env === 'dev';

    const colors = [
      '#1f84d2',

      '#023a63',
      '#91abbe',
      '#00CED1',
      '#d0010d',
      '#e2ac30',
      '#FF1493',
      '#FF69B4',
      '#FF4500',
      '#1E90FF',
      '#8B008B',
      '#00CED1',
      '#FF6347',
      '#8B0000',
      '#2E8B57',
    ];




    const legenda = (users) => {
      let index = 0;
      const uniqueEvents = [];
      uniqueEvents.push({
        title: "Weekend",
        color: "#d3d7de"
      })
      users.forEach(user => {
        user.events.forEach(event => {
          if (!uniqueEvents.some(item => item.title === event.name)) {
            const colored = colors[index % colors.length];
            index++;
            uniqueEvents.push({
              title: event.name,
              color: colored
            });
          }
        });
      });
      return uniqueEvents;
    };
    const legend = legenda(users);
    const convertEvents = (users) => {
      return users.flatMap(user =>
        user.events.map((event) => {
          const colorlegenda = legend.find(item => item.title === event.name);
          return {
            id: event.id,
            title: event.name,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            resource: user.id,
            color: colorlegenda ? colorlegenda.color : 'grey',
          };
        })
      );
    }
    const getDaysInMonth = (year, month) => {
      let days = []
      const totaldays = new Array(new Date(year, month + 1, 0).getDate());
      for (let day = 1; day <= totaldays.length; day++) {
        const daydate = new Date(year, month, day);
        const weekend = daydate.getDay() === 0 || daydate.getDay() === 6
        days.push({
          day,
          weekend
        })
      }
      return (days)

    };


    const events = convertEvents(users);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const [selectedMonth, setSelectedMonth] = useState(`${currentMonth}`);
    const [selectedYear, setSelectedYear] = useState(`${currentYear}`);
    const defaultDays = getDaysInMonth(currentYear, currentMonth)
    const [daysInMonth, setdaysInMonth] = React.useState(defaultDays);
    const updateDaysInMonth = (year, month) => {
      const days = getDaysInMonth(parseInt(year), parseInt(month));
      setdaysInMonth(days);
    };
    const yearSelectChange = (event) => {
      setSelectedYear(event.target.value);
      updateDaysInMonth(event.target.value, selectedMonth);  
    };
    const monthSelectChange = (event) => {
      const monthindex = parseInt(event.target.value, 10);
      const days = getDaysInMonth(currentYear, monthindex);
      setdaysInMonth(days);
      setSelectedMonth(`${monthindex}`)
    };



    return (
      <div className={classes.calendarContainer}>
        <div className={classes.topwrapper}>
          <Icon name="FileIcon" className={classes.icon}/>
          <select className={classes.select1} value={selectedYear} onChange={yearSelectChange}>
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i} value={currentYear - i}>{currentYear - i}</option>
            ))}
          </select>

          <select className={classes.select2} src="" value={selectedMonth} onChange={monthSelectChange}>
          <Icon name="FileIcon" className={classes.icon}/>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>

          <div className={classes.legend}>
            <ul className={classes.legendUl}>
              {legend.map((event) => (
                <li className={classes.legendIl} key={event.title}>
                  <div
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      backgroundColor: event.color,
                      marginRight: '10px',
                      borderRadius: '4px'
                    }}
                  />
                  <div className={classes.span1}>{event.title}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <table className={classes.calendarTable} >
          <thead>
            <tr className={classes.tableRow}>
              <th className={classes.tableHeader}>Name </th>
              <th className={classes.tableHeader}>Role</th>
              {daysInMonth.map((day) => (
                <th key={day.day} className={classes.tableHeader}>{day.day}</th>
              ))}
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {users.map((user) => (
              <tr key={user.id} className={classes.tableRow}>
                <td className={classes.nameCell}><Icon name="AccountCircle" className={classes.icon} />
                {user.name}</td>
                <td className={classes.rollCell}>{user.role}</td>
                {daysInMonth.map((day) => {
                  const event = events.filter(event =>
                  (new Date(event.start).getDate() === day.day &&
                    new Date(event.start).getMonth() === parseInt(selectedMonth, 10) &&
                    new Date(event.start).getFullYear() === parseInt(selectedYear, 10) &&
                    event.resource === user.id)
                  )
                  return (
                    <td key={day.day} className={classes.tableCell}
                      style={
                        !day.weekend
                          ? (event.length > 0
                            ? { backgroundColor: event[0].color }
                            : {})
                          : {
                            backgroundColor: "#d3d7de",

                          }
                      }
                    >
                      {event.length > 0 ? (
                        <div className={classes.eventLabel}>
                          {event.map(Event => (
                            <div key={Event.id}>
                              {Event.title === 'Kickoff Meeting' ? "#1" : ""  }
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {

      tbody: {
        border: '1px solid ##d3d7de',
      },
      calendarContainer: {
        overflowX: 'auto',
        fontFamily: 'Arial, sans-serif',
        color: '#033453'
      },
      calendarTable: {
        borderCollapse: 'collapse',
      },
      topwrapper: {
        display: 'flex',
        alignItems: 'center'
      },
      tableHeader: {
        whiteSpace: 'nowrap',
        textAlign: 'left',
        fontSize: '14px',
        padding: '8px',
        height: '40px',
      },
      tableRow: {},
      select1: {
        fontSize: '14px',
        color: '#333',
        backgroundColor: '#FFFFFF',
        border: '1px solid #d3d7de',
        borderRadius: '4px',
        padding: '5px',
        height: '40px',
        marginRight: '15px'
      },
      select2: {
        fontSize: '14px',
        color: '#333',
        backgroundColor: '#FFFFFF',
        border: '1px solid #d3d7de',
        borderRadius: '4px',
        padding: '5px',
        height: '40px'
      },
      tableCell: {
        textAlign: 'center',
        border: '1px solid #d3d7de',
        height: '40px',
        width: '40px',
        padding: '0px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      nameCell: {
        textAlign: 'left',
        height: '40px',
        width: '150px',
        padding: '8px',
        fontWeight: 'bold',
        whiteSpace: 'normal',
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        borderRight: 'none',
        borderBottom: 'none',
        borderLeft: '1px solid #d3d7de',
        borderTop: '1px solid #d3d7de'
      },
      rollCell: {
        textAlign: 'center',
        height: '40px',
        width: '50px',
        fontWeight: 'bold',
        whiteSpace: 'normal',
        overflow: 'visible',
        alignItems: 'center',
        borderRight: '1px solid #d3d7de',
        borderBottom: '1px solid #d3d7de',
        borderLeft: 'none',
        borderTop: '1px solid #d3d7de',
        fontSize: '12px'
      },
      eventLabel: {
        backgroundColor: 'inherit',
        color: '#fff',
        borderRadius: '4px',
        fontSize: '12px',
        textAlign: 'center',
      },
      legendUl: {
        display: 'flex',
        listStyleType: 'none',
        gap: '15px',
      },
      legendIl: {
        display: 'flex',
        alignItems: 'center',
      },
      icon: {
        fontSize: '50px',
        color: "#033453",
        marginRight: "10px",
      }
    };
  }
  
}))();