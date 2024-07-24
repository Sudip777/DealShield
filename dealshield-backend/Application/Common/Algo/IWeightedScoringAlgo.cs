using Domain.Bids;
using Domain.User;

namespace Application.Common.Algo;
public interface IWeightedScoringAlgo
{
    Task<Bid> GetRecommendedBid(IReadOnlyList<Bid> bids, Consumer consumer);
}