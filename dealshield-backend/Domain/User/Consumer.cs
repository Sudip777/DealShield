using Domain.Order.ValueObjects;

namespace Domain.User;

public class Consumer : UserBase
{
    public readonly static Consumer Empty = new Consumer(UserId.Create(Guid.Empty), null, null, null, null, null, 50, 50);
    public int lowCostPreference { get; private set; } = 50;
    public int trustPref { get; private set; } = 50;
    //TODO: Bargain object
    private List<OrderId> _orderIds = [];
    public IReadOnlyList<OrderId> OrderIds => _orderIds.AsReadOnly();

    public override UserType UserType => UserType.CONSUMER;

    private Consumer(UserId id, string fName, string lName, string email, string password, string mobileNo, int lowCostPreff, int trustPreff)
        : base(id, fName, lName, email, password, mobileNo)
    {
        lowCostPreference = lowCostPreff;
        trustPref = trustPreff;
    }

    public static Consumer Create(string fName, string lName, string email, string password, string mobileNo, int lowCostPref, int trustPref)
    {
        return new(
                UserId.CreateUnique(),
                fName,
                lName,
                email,
                password,
                mobileNo,
                lowCostPref,
                trustPref
                );
    }

    /// <summary>
    /// Assigns the order id to the user
    /// </summary>
    /// <param name="orderId">Order Id to add</param>
    public void AddOrder(OrderId orderId)
    {
        _orderIds.Add(orderId);
    }

    //TODO: Change email, password, and mobile num. Maybe first and lastname

    private Consumer() { }
}
