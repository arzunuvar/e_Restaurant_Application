using GeoCoordinatePortable;
using System;

namespace eRestaunrant.Web.Helpers
{
    public static class DistanceCalculater
    {

        public static double Calculate(double lat, double lng, double lat1, double lng1)
        {
            var gc = new GeoCoordinate(lat, lng);
            var gc1 = new GeoCoordinate(lat1, lng1);

            return gc.GetDistanceTo(gc1);
        }
       
    }
}
